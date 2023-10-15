import * as noDataImg from './img/noData.png'
import './noData.css'

function NoData (): JSX.Element {
  return (
        <>
            <div className="no-data-container text-center">
                <img src={noDataImg.default} alt="no-data" className="no-data-img" />
                <div className="no-data-layer"></div>
                <p className='no-data-text'>Товары не найдены :-(</p>
            </div>
        </>
  )
}

export default NoData
