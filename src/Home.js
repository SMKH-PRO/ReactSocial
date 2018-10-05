import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';

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
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {Link} from 'react-router-dom'





function Posts(props) {





  return (


    props.PostDescription.map((data, index) => {



      return (
        <div>




          <Card key={index} className="card post">
            <CardHeader
              avatar={
                <Avatar src={data.UserIMG} aria-label="Recipe" className={"avatar"}>
                  {data.Name.substring(0, 1)}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={ <Link to={`/Profile/${data.PostedBy}`}><span   style={{ fontSize: 13, fontWeight: 600,cursor:'Pointer' }}>
              
              {data.Name}
              
              
              </span></Link>}
              subheader={ <Link to={`/Post/${data.PostID}`}>  {data.Time}
              </Link>
              
              }
            />
            <CardMedia
              className={"media"}
              image={data.PostAttachment}
              title={`Posted By ${data.Name}`}
            />
            <CardContent>
              <Typography component="p">
                {data.PostText}
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













        </div>)



    })
  )
}














class Home extends Component {


  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      ProfileIMG: 'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/loadingprofile.gif',
      PostText: '',
      PostLoading: false,
      PostType: 'Text',
      PostAttachment: '',
      openDialog: false,
      DialogTitle: '',
      DialogDescription: '',


      PostDescription: []

    }
    this.FunctionBeforeRender = this.FunctionBeforeRender.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.keyDownHandler = this.keyDownHandler.bind(this)
    this.Post = this.Post.bind(this)

    this.startDisplayPosts();


  }

 


  startDisplayPosts() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.DisplayPosts()


        let countIteration = 0
          firebase.database().ref("POST").on('child_added', (d) => { //Check if posts available
countIteration += 1;
            if(countIteration == d.numChildren()){
//alert("Child_added")
console.log("start display",d.val())
this.setState({PostDescription:[]})
  this.DisplayPosts()//Geting post from firebase

  countIteration = 0
}

          })
      
       
      }
    })
  }

  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);


    this.FunctionBeforeRender()
  }








  handleChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/\s\s+/g, ' '),
    });

    if (name == "PostText") {
      if (this.state.PostText.length > 499) {
        setTimeout(() => {
          this.setState({ PostText: this.state.PostText.substring(0, 500) })

        }, 20);
      }
    }

  };
  FunctionBeforeRender() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.







        firebase.database().ref(`USERDETAILS/${user.uid}/`).on('value', (data) => {
          if (data.child("Name").val() != null && data.child("Bio").val() != null && data.child("Country").val() && data.child("City").val() != null && data.child("Age").val() != null && data.child("Gender").val() != null) {

            this.setState({ Name: data.child("Name").val(), ProfileIMG: data.child("Pic").val() })


            console.log("This user has a complete")
          } else {
            console.log("Something Is Missing!", data.child("Gender").val(), data.child("Bio").val(), data.child("Age").val())

            this.props.history.push('EditProfile')

          }

        })

        // console.log(user)

        // ...
      } else {
        // User is signed out.
        this.props.history.push('/')

      }
    });
  }



  keyDownHandler(e) {






    var s;

    let convertEmojees = {
      '<3': '\u2764\uFE0F',
      '</3': '\uD83D\uDC94',
      ':D': '\u{1f600}',
      'XD': '\uD83D\uDE00',
      ':)': '\uD83D\uDE03',
      '>_<': '\u{1f606}',
      ';)': '\uD83D\uDE09',

      ':(': '\uD83D\uDE12',
      ':P': '\uD83D\uDE1B',
      ';P': '\uD83D\uDE1C',
      ':P': '\uD83D\uDE1B',
      ';P': '\uD83D\uDE1C',

      ":'(": "\uD83D\uDE22",
      "#_#": "\u{1f60D}",
      "*_*": "\u{1f929}",
      "$_$": "\u{1f911}",
      "-_-": "\u{1f611}",
      "sick!": "\u{1f912}",
      "B)": "\u{1f60E}",
      ":O": "\u{1f632}",
      "8O": "\u{1f631}",
      "<3": "\u{2764}",
      "</3": "\u{1f494}",
      ".!.": "\u{1f446}",
      "(Y)": "\u{1f440}",
      "!3": "\u{1f440}",
      "santa": "\u{1f385}",
      "!..!": "\u{1f91f}",




    }
    for (s in convertEmojees) {
      var regex = new RegExp(s.replace(/([()[{*+.$^\\|?])/gi, '\\$1'), 'i');

      e.target.value = e.target.value.replace(regex, convertEmojees[s])
    }







    setTimeout(() => {
      this.setState({ PostText: this.state.PostText.substring(0, 500) })

    }, 20);




    if (e.target.value.length > 499) {
      if (e.keyCode != 8 || (!e.keyCode === 17 && e.keyCode === 65)) {


        e.preventDefault()

        this.setState({ PostText: this.state.PostText.substring(0, 500) })
      }


    }

  }


  DisplayPosts() {

    let wow = 0

    wow += 1 //CHecking how many time this function runs!

    console.log("Display Post: ", wow)

     //subse pehle array ko empty karo then new data load kro

     this.setState({PostDescription:[]})
    let posts
    firebase.database().ref("POST").on('value', data1 => { //Post ki parent node!
      console.log(data1.numChildren()) // total kitne post hai (Count post)




      data1.forEach(data => {  // Going into Post datas!

        // if(data.child("PostType").val() == "Text"){
        firebase.database().ref(`USERDETAILS/${data.val().PostedBy}`).once('value', userdata => { //Jis user ne post ki hai uska data mangwaraha hu.
          const dataa = this.state.PostDescription

          if (this.state.PostDescription.length < data1.numChildren()) {
           posts = {
             PostID: data.key,
              PostedBy: data.val().PostedBy,
              PostText: data.val().PostText,
              Time: data.val().PostTime,
              PostAttachment: data.val().PostAttachment,
              UserIMG: userdata.val().Pic,
              Name: userdata.val().Name
            } 

            console.log({PostedBy: data.val().PostedBy,
              PostText: data.val().PostText,
              Time: data.val().PostTime,
              PostAttachment: data.val().PostAttachment,
              UserIMG: userdata.val().Pic,
              Name: userdata.val().Name})

            dataa.push(posts) //Data aray me push kardia
            console.log(dataa)
            this.setState({ PostDescription: dataa })
          }
        })
      })

      // }

    })
    console.log(this.state.PostDescription)

  }//Ends here


  Post() {
    this.setState({ PostLoading: true})

    const { PostText, PostLoading, PostType, PostAttachment } = this.state


    if (PostText.length < 501 && PostText.replace(/\s/g, "").length > 4) {
      this.setState({ PostLoading: true })

      let date = new Date();
      let OnlyDate = date.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })
      let OnlyTime = date.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })

      if (PostType == "Text") {

        firebase.database().ref('POST').push({
          PostText: PostText,
          PostedBy: firebase.auth().currentUser.uid,
          PostType: PostType,
          PostTime: OnlyDate + " at " + OnlyTime,
          PostAttachment: PostAttachment


        }).then(() => {
          this.setState({ PostLoading: false, PostText: '',PostDescription:[] })

        this.DisplayPosts()


        })

      }



    }
    else if (PostText.length > 500) {


      
      this.setState({ PostLoading: false, openDialog: true, DialogDescription: "You have exceeded character limits in your post, Please write a post with in less than 500 characters (character includes spaces also) ", DialogTitle: "Character Limit Exceeded!" })

    }
    else if (PostText.replace(/\s/g, "").length < 5) {

      this.setState({ PostLoading: false, openDialog: true, DialogDescription: "You forgot to write description, Write atleast 5 alphabet.  ", DialogTitle: "Missing Description.!" })

    }



  }






  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { Name, ProfileIMG, PostText, PostLoading, PostDescription } = this.state
    const { classes } = this.props;
    let UserPosts = PostDescription


    console.log(UserPosts)


    return (
      <div >

        <Dialog
          open={this.state.openDialog}
          keepMounted
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.DialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.DialogDescription}
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleCloseDialog} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>



        <img className="PostAvatar" src={ProfileIMG ? ProfileIMG : undefined} />
        <p style={{ float: 'right', position: 'relative' }}>{PostText.length} / 500</p>
        <Paper className="PostDiv">
          <textarea ref={c => (this.textarea = c)} onPaste={this.keyDownHandler} value={PostText} onKeyDown={this.keyDownHandler} onChange={this.handleChange("PostText")} className="PostTextArea"></textarea>
        </Paper>
        <Button variant="fab" className="attachicon" >
          <Attach /></Button>

        <div style={{ margin: '5px', position: 'relative', width: 71, float: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            className="PostBtn"
            disabled={PostLoading}
            onClick={this.Post}
          >
            Post
          </Button>
          {PostLoading && <CircularProgress size={24} className="buttonProgress" />}
        </div>

        <br /><br />
        <Divider style={{ width: '100%', marginTop: '20px' }} />








        <br /><br />

        {
          <Posts PostDescription={PostDescription} /
          >
        }

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
       





      </div>

    );
  }
}

export default Home;
