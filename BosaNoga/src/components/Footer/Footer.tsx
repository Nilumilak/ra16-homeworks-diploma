import Information from '../Information/Information'
import PayingSystems from '../PayingSystems/PayingSystems'
import Copyright from '../Copyright/Copyright'
import FooterContacts from '../FooterContacts/FooterContacts'
import './Footer.css'

function Footer() {
    return (
        <footer className="container bg-light footer">
            <div className="row">
                <div className="col">
                    <Information />
                </div>
                <div className="col">
                    <PayingSystems />
                    <Copyright />
                </div>
                <div className="col text-right">
                    <FooterContacts />
                </div>
            </div>
        </footer>
    )
}

export default Footer