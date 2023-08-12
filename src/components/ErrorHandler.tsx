import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { SerializedError } from "@reduxjs/toolkit"

export interface IErrorHandlerProps {
  error: FetchBaseQueryError | SerializedError | undefined
}

const ErrorHandler = (props: IErrorHandlerProps) => {
  if (props.error) {
    if ("status" in props.error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        "error" in props.error
          ? props.error.error
          : JSON.stringify(props.error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{props.error.message}</div>
    }
  }
}
export default ErrorHandler
