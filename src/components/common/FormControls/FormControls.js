import s from './FormControls.module.css'

export const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return <div className={s.formControl+' '+(hasError ? s.error : '')}>
        <props.fieldType {...input} {...props} />
        {hasError && <span>{meta.error}</span>}
    </div>
}

