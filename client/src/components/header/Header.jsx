import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color : #000;
`
const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const Header = () =>{
    return(
        <AppBar>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </AppBar>
    )
}
export default Header; 