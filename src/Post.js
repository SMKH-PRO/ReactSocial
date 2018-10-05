import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import ScaleLoading from 'react-spinners/ScaleLoader';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Home.css'
import * as firebase from 'firebase';
import Paper from '@material-ui/core/Paper';
import Attach from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import autosize from "./AutoResizeTxtArea";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';


class Post extends Component {


  constructor(props){
    super(props)
  this.state ={
PostTime:'',
UserIMG:'',
Name:'',
PostedBy:'',
PostAttachment:'',
PostText:'',
LoadingPost:true,

  }
  
  }

  
  componentDidMount(){

    if(this.props.match.params.postid == undefined){
        this.props.history.push('/404')
        
    }else{


        firebase.database().ref('POST').on('value',(d)=>{

            if(d.hasChild(this.props.match.params.postid) !== true){
                this.props.history.push('/404')

            }
            else{

                firebase.database().ref(`POST/${this.props.match.params.postid}`).on('value',(post)=>{

                    let data= post.val();


               firebase.database().ref(`USERDETAILS/${data.PostedBy}`).once('value',(user)=>{

                let UserData = user.val()
                this.setState({

                    PostTime:data.PostTime,
UserIMG:UserData.Pic,
Name:UserData.Name,
PostedBy:data.PostedBy,
PostAttachment:data.PostAttachment,
PostText:data.PostText,
LoadingPost: false
                })


                
               })
                
                
                
                
                })
            }
        })
    }



    

  }
  
  render() {
const {UserIMG,Name,PostedBy,PostAttachment,PostText,PostTime,LoadingPost} = this.state
    
    return (
      <div>




{LoadingPost ? (<ScaleLoading  sizeUnit={"px"}  color="#2196f3" size={25}  loading={this.state.MainLoading} />) : (

          <Card  className="card post">
            <CardHeader
              avatar={
                <Avatar src={UserIMG} aria-label="Recipe" className={"avatar"}>
                  {Name.substring(0, 1)}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={ <Link to={`/Profile/${PostedBy}`}><span   style={{ fontSize: 13, fontWeight: 600,cursor:'Pointer' }}>
              
              {Name}
              
              
              </span></Link>}
              subheader={  PostTime
            
              
              }
            />
            <CardMedia
              className={"media"}
              image={PostAttachment}
              title={`Posted By ${Name}`}
            />
            <CardContent>
              <Typography component="p">
                {PostText}
              </Typography>
            </CardContent>
            <CardActions className={"actions"} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>

            </CardActions>
            {/* {<Collapse in={false} timeout="auto" unmountOnExit>
            <CardContent>
          
              <Typography paragraph>
                This is ful descriotnion
              </Typography>
           
            </CardContent>
          </Collapse>} */}
          </Card>


)}






















    </div>
      
    );
  }
}

export default Post;
