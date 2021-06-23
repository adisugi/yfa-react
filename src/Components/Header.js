import React from 'react';
import {Navbar, Nav, Dropdown, Container} from 'bootstrap-4-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faBoxOpen,
    faSearch,
    faShippingFast,
    faInfoCircle,
    faUsers,
    faChevronDown, faUser
} from '@fortawesome/free-solid-svg-icons';
import '../Style/Header.scss';
import {makeStyles} from "@material-ui/core";
import {Link} from 'react-router-dom';


const Header = (props) => {
    const username = localStorage.getItem("username")
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: props.bgNav,
            [theme.breakpoints.up(992)]: {
                backgroundColor: 'rgba(0,0,0,.5)'
            }
        },
    }))

    const styles = useStyles();
    const [slide, setSlide] = React.useState(0);
    // const mediaQuery = {
    //     mobile: '@media (min-width: 992px)'
    // }
    // const NavbarYFA = glamorous.div({
    //     backgroundColor: props.bgNav,
    //     [mediaQuery.mobile] : {
    //         backgroundColor: 'rgba(0,0,0,.5)'
    //     }
    // })

    const logout = (e) => {
        localStorage.clear()
        window.location.reload();
    }

    return (
        <Navbar className={`${styles.root} navbar navbar-expand-lg`}>
            <Container className="navbar-container">
                <Link to="/">
                    <Navbar.Brand className='font-putih'>
                        YFA
                    </Navbar.Brand>
                </Link>
                <div className="nav-burger"
                     onClick={(e) => setSlide(!slide)}>
                    <div className={`nav-burger-span ${slide? 'silang' : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div navbar className={`navbar-container navbar-mobile ${slide ? 'slide' : ''}`}>
                    {/* style={collapse?{position: 'absolute'}:{display:"block"}} */}
                    {/* style={slide?{transform: 'translateX(0)'}:{transform:"translateX(100%)"}} */}
                    <Navbar.Nav className='font-putih' mr="auto">
                            <Link to="/dropoff">
                                <Nav.Item className="nav-item-center nav-item-background">
                                    <div className="flex-center cursor">
                                        <FontAwesomeIcon className="icon-center"
                                                         icon={faBoxOpen}/>
                                        <Nav.Link className='font-putih'>DropOff</Nav.Link>
                                    </div>
                                </Nav.Item>
                            </Link>
                            <Link to="/lacak">
                                <Nav.Item className="nav-item-center nav-item-background">
                                    <div className="flex-center cursor">
                                        <FontAwesomeIcon className="icon-center"
                                                         icon={faSearch}/>
                                        <Nav.Link className='font-putih'>Lacak</Nav.Link>
                                    </div>
                                </Nav.Item>
                            </Link>
                            <Link to="/layanan">
                                <Nav.Item className="nav-item-center nav-item-background">
                                    <div className="flex-center cursor">
                                        <FontAwesomeIcon className="icon-center"
                                                         icon={faShippingFast}/>
                                        <Nav.Link className='font-putih'>Layanan</Nav.Link>
                                    </div>
                                </Nav.Item>
                            </Link>
                            <Nav.Item dropdown className="drop-down-menu nav-item-center nav-item-background">
                                <div className="flex-center cursor">
                                    <FontAwesomeIcon className="icon-center"
                                                     icon={faInfoCircle}/>
                                    <Nav.Link className='font-putih'>Informasi</Nav.Link>
                                    <FontAwesomeIcon className="icon-center margin-left-minus chevron-down"
                                                     icon={faChevronDown}/>
                                </div>
                                <div className="drop-down-item drop-down-item-open font-putih">
                                    <Dropdown.Item style={{textAlign: 'center'}}>FAQ</Dropdown.Item>
                                    <Link to="/informasi/panduan">
                                        <Dropdown.Item style={{textAlign: 'center'}}>Panduan</Dropdown.Item>
                                    </Link>
                                    <Link to="/informasi/larangan">
                                        <Dropdown.Item style={{textAlign: 'center'}}>Larangan</Dropdown.Item>
                                    </Link>
                                </div>
                            </Nav.Item>
                            <Link to="/about-us">
                                <Nav.Item className="nav-item-center nav-item-background">
                                    <div className="flex-center cursor">
                                        <FontAwesomeIcon className="icon-center"
                                                         icon={faUsers}/>
                                        <Nav.Link className='font-putih'>About Us</Nav.Link>
                                    </div>
                                </Nav.Item>
                            </Link>
                        <div className="user-menu">
                            <Nav.Item dropdown className="drop-down-menu nav-item-center nav-item-background">
                                <div className="flex-center cursor">
                                    <FontAwesomeIcon className="icon-center"
                                                     icon={faUser}/>
                                    <Nav.Link className='font-putih'>{username}</Nav.Link>
                                    <FontAwesomeIcon className="icon-center margin-left-minus chevron-down"
                                                     icon={faChevronDown}/>
                                </div>
                                <div className="drop-down-item drop-down-item-open-user font-putih">
                                    <Link to="/informasi/panduan">
                                        <Dropdown.Item style={{textAlign: 'center'}}>Menu Customer</Dropdown.Item>
                                    </Link>
                                    <Link to="/admin/transaksi">
                                        <Dropdown.Item style={{textAlign: 'center'}}>Menu Admin</Dropdown.Item>
                                    </Link>
                                    <Dropdown.Item style={{textAlign: 'center'}} onClick={logout}>Logout</Dropdown.Item>
                                </div>
                            </Nav.Item>
                        </div>
                    </Navbar.Nav>
                </div>
            </Container>
        </Navbar>
    );

}

export default Header;
