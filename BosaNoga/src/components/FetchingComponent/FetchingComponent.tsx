import Preloader from '../Preloader/Preloader'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

type FetchingComponentProps = {
  data: JSX.Element | JSX.Element[]
  loadingState: boolean
  errorState: string | null
  reFetchFunction: () => void
}

function FetchingComponent ({ data, loadingState, errorState, reFetchFunction }: FetchingComponentProps): JSX.Element | JSX.Element[] {
  return loadingState
    ? <Preloader />
    : errorState
      ? <ErrorHandler handleReload={() => { reFetchFunction() }} />
      : data
}

export default FetchingComponent
