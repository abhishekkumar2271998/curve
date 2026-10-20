import { useRef, useState } from 'react';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesAccept(file, accept) {
  if (!accept) return true;
  return accept.split(',').some((rule) => {
    const pattern = rule.trim();
    if (pattern.startsWith('.')) return file.name.toLowerCase().endsWith(pattern.toLowerCase());
    if (pattern.endsWith('/*')) return file.type.startsWith(pattern.slice(0, -1));
    return file.type === pattern;
  });
}

export default function FileUpload({ accept, multiple = true, maxSize = 10 * 1024 * 1024, maxFiles = 5, onChange }) {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    const nextErrors = [];
    const accepted = [];

    Array.from(incoming).forEach((file) => {
      if (!matchesAccept(file, accept)) {
        nextErrors.push(`${file.name}: file type not allowed`);
      } else if (file.size > maxSize) {
        nextErrors.push(`${file.name}: larger than ${formatSize(maxSize)}`);
      } else if (files.some((f) => f.name === file.name && f.size === file.size)) {
        nextErrors.push(`${file.name}: already added`);
      } else {
        accepted.push(file);
      }
    });

    let next = multiple ? [...files, ...accepted] : accepted.slice(0, 1);
    if (next.length > maxFiles) {
      nextErrors.push(`Only ${maxFiles} files allowed`);
      next = next.slice(0, maxFiles);
    }

    setFiles(next);
    setErrors(nextErrors);
    onChange?.(next);
  };

  const removeFile = (index) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange?.(next);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  return (
    <div className="file-upload">
      <div
        className={dragging ? 'file-upload-dropzone dragging' : 'file-upload-dropzone'}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragging(false)}
      >
        <p>Drag files here or click to browse</p>
        <small>
          Max {formatSize(maxSize)} per file{accept ? ` · ${accept}` : ''}
        </small>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {errors.length > 0 && (
        <ul className="file-upload-errors" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="file-upload-list">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}`}>
              <span>{file.name}</span>
              <span className="file-upload-size">{formatSize(file.size)}</span>
              <button type="button" aria-label={`Remove ${file.name}`} onClick={() => removeFile(index)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
