import React, { useState, useMemo } from 'react';
import { Field, TextInput, Typography } from '@strapi/design-system';
import { createLucideIcon } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dist/esm/dynamicIconImports.mjs';

const ICON_NAMES = Object.keys(dynamicIconImports).sort();

const DynamicIcon = React.memo(function DynamicIcon({ name, size = 18 }) {
  const [iconNode, setIconNode] = React.useState(null);

  React.useEffect(() => {
    if (!name || !dynamicIconImports[name]) return;
    let cancelled = false;
    dynamicIconImports[name]().then((mod) => {
      if (!cancelled) setIconNode(mod.__iconNode || mod.default?.__iconNode);
    });
    return () => { cancelled = true; };
  }, [name]);

  if (!iconNode) return <span style={{ width: size, height: size }} />;

  const Icon = createLucideIcon('Icon', iconNode);
  return <Icon size={size} strokeWidth={2} />;
});

export default function IconPicker({ name, value, onChange, error, hint, required }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return ICON_NAMES.slice(0, 80);
    const s = search.toLowerCase();
    return ICON_NAMES.filter((n) => n.includes(s)).slice(0, 60);
  }, [search]);

  const handleSelect = (iconName) => {
    onChange(name, iconName);
    setSearch(iconName);
    setOpen(false);
  };

  return (
    <Field.Root name={name} error={error} hint={hint} required={required}>
      <Field.Label>Icono</Field.Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        {value ? <DynamicIcon name={value} size={22} /> : null}
        <TextInput
          placeholder="Buscar icono..."
          value={search || value || ''}
          onChange={(e) => { setSearch(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
        />
      </div>
      {open && (
        <div style={{
          maxHeight: '240px', overflow: 'auto', border: '1px solid var(--neutral200)',
          borderRadius: '4px', background: 'var(--neutral0)', marginTop: '4px',
        }}>
          {filtered.map((iconName) => (
            <div
              key={iconName}
              onMouseDown={(e) => { e.preventDefault(); }}
              onClick={() => handleSelect(iconName)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px',
                cursor: 'pointer', background: iconName === value ? 'var(--neutral100)' : 'transparent',
              }}
            >
              <DynamicIcon name={iconName} size={18} />
              <Typography>{iconName}</Typography>
            </div>
          ))}
        </div>
      )}
      <Field.Error />
      <Field.Hint />
    </Field.Root>
  );
}
