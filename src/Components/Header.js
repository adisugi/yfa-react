import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Collapse, Container } from 'bootstrap-4-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faSearch, faShippingFast, faInfoCircle, faUsers, faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import '../Style/Header.scss'
// import glamorous from "glamorous";
import {makeStyles} from "@material-ui/core";


const Header = (props) => {

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

    return(
        <Navbar className={`${styles.root} navbar navbar-expand-lg`}>
            <Container className="navbar-container">
                <Navbar.Brand className='font-putih' href="#">
                    LOGO
                </Navbar.Brand>
                <div className="nav-burger"
                     style={{width: '50px', height: "50px", background: "fff"}}
                     onClick={(e) => setSlide(!slide)}>
                    <FontAwesomeIcon className="font-putih"
                                     icon={faBars}
                                     style={{marginTop: "16px", fontSize: "18px"}}/>
                </div>
                <div navbar className={`navbar-container navbar-mobile ${slide? 'slide' : ''}`}>
                    {/* style={collapse?{position: 'absolute'}:{display:"block"}} */}
                    {/* style={slide?{transform: 'translateX(0)'}:{transform:"translateX(100%)"}} */}
                    <Navbar.Nav className='font-putih' mr="auto">
                        <Link to="/dropoff">
                            <Nav.Item className="nav-item-center nav-item-background">
                                <div className="flex-center cursor">
                                    <FontAwesomeIcon className="icon-center"
                                                     icon={faBoxOpen} />
                                    <Nav.Link className='font-putih'>DropOff</Nav.Link>
                                </div>
                            </Nav.Item>
                        </Link>
                        <Link to="/lacak">
                            <Nav.Item className="nav-item-center nav-item-background">
                                <div className="flex-center cursor">
                                    <FontAwesomeIcon className="icon-center"
                                                     icon={faSearch} />
                                    <Nav.Link className='font-putih'>Lacak</Nav.Link>
                                </div>
                            </Nav.Item>
                        </Link>
                        <Link to="/layanan">
                            <Nav.Item className="nav-item-center nav-item-background">
                                <div className="flex-center cursor">
                                    <FontAwesomeIcon className="icon-center"
                                                     icon={faShippingFast} />
                                    <Nav.Link className='font-putih'>Layanan</Nav.Link>
                                </div>
                            </Nav.Item>
                        </Link>
                        <Nav.Item dropdown className = "drop-down-menu nav-item-center nav-item-background">
                            <div className="flex-center cursor">
                                <FontAwesomeIcon className="icon-center"
                                                 icon={faInfoCircle} />
                                <Nav.Link className='font-putih'>Informasi</Nav.Link>
                                <FontAwesomeIcon className="icon-center margin-left-minus chevron-down"
                                                 icon={faChevronDown}/>
                            </div>
                            <div className="drop-down-item drop-down-item-open font-putih">
                                <Dropdown.Item style={{textAlign: 'center'}}>FAQ</Dropdown.Item>
                                <Dropdown.Item style={{textAlign: 'center'}}>Panduan</Dropdown.Item>
                                <Dropdown.Item style={{textAlign: 'center'}}>Larangan</Dropdown.Item>
                            </div>
                        </Nav.Item>
                        <Link to="/about-us">
                            <Nav.Item className="nav-item-center nav-item-background">
                                <div className="flex-center cursor">
                                    <FontAwesomeIcon className="icon-center"
                                                     icon={faUsers} />
                                    <Nav.Link className='font-putih'>About Us</Nav.Link>
                                </div>
                            </Nav.Item>
                        </Link>
                    </Navbar.Nav>
                </div>
            </Container>
        </Navbar>
    );

}

export default Header;