import React, { useState ,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom' 
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import  decode from 'jwt-decode'
export const Navbar = () => {
	const classes = useStyles()
	const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
	const dispatch = useDispatch()
	const history = useNavigate()
	const location = useLocation()
	const logout =()=>{
		dispatch({type:'LOGOUT'})
		history('/auth')
		setUser(null)
	}
	useEffect(() =>{
		const token = user?.token

		if(token){

			const decodedToken= decode(token)
			if(decodedToken.exp *1000 <new Date().getTime()) logout()
		}

		setUser(JSON.parse(localStorage.getItem('profile')))
	},[location])
	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
        <Typography className={classes.heading}  component={Link} to="/" variant='h2' align='center'>
          InstSocial
        </Typography>
			</div>
			<Toolbar className={classes.toolbar}>
		{
			user ?(
				<div className={classes.profile}>
					<Avatar className={classes.purple} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
					<Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
					<Button variant="container" className={classes.logout}  onClick={logout} color="secondary">LogOut</Button>

				</div>
			):(
				<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
			)
		}
			</Toolbar>
		</AppBar>
	)
}
