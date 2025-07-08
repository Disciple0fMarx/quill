import MDEditor from '@uiw/react-md-editor'

interface MarkdownEditorProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const MarkdownEditor = ({ id, name, value, onChange, disabled = false }: MarkdownEditorProps) => (
    <div>
        <MDEditor
            value={value}
            onChange={(val) => onChange(val || '')}
            height={400}
            preview="edit"
            textareaProps={{
              id: id,
              name: name,
              'aria-label': "Markdown editor",
              disabled: disabled,
            }}
         />
    </div>
)

export default MarkdownEditor
