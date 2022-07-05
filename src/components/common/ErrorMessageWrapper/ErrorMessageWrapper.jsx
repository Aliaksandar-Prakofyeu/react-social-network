import s from './ErrorMessageWrapper.module.css'


export const ErrorMessageWrapper = (message) => {
    return <div>
        <span className={s.errorMessage}>{message}</span>
    </div>
}