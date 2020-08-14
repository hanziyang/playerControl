import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import './index.css';
import VideoCard from './videoCard'; 
import axios from 'axios';

let timer = undefined; 
const { confirm } = Modal;

class VideoList extends Component {

  constructor(props){
    super(props)
    this.state = {

      // 视频列表 标题、封面地址、播放状态、播放时长
      videoList : [
        {
          title:"视频一",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        },
        {
          title:"视频二",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        },
        {
          title:"视频三",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        },
        {
          title:"视频四",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        },
        {
          title:"视频五",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        },
        {
          title:"视频六",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        },
        {
          title:"视频七",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        },
        {
          title:"视频八",
          srcImage:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          playingStatus: false,
          percent: 0,
          duration: '00:02:10'
        }
      ] ,

      // 当前播放视频
      nowPlayVideo : "",

    }
  }
  componentDidMount(){
    // axios.post('playerControl/socket.php', {"open":true}).then(res => console.log(res.data)); 
  }


  onRef =(name,ref)=> {
 
    switch(name) {
      case "videoCard1":
        this.videoCard1 =ref;
        break;
      case "videoCard2":
        this.videoCard2 =ref;
        break;
      case "videoCard3":
        this.videoCard3 =ref;
        break;  
      case "videoCard4":
        this.videoCard4 =ref;
        break;  
      case "videoCard5":
        this.videoCard5 =ref;
        break;
      case "videoCard6":
        this.videoCard6 =ref;
        break;
      case "videoCard7":
        this.videoCard7 =ref;
        break;
      case "videoCard8":
        this.videoCard8 =ref;
        break;
      default :
        break;
    }
  }

  // 播放状态更改
  playerControl =(value,status)=> {
    let video = this.state.videoList.map((item) => {
      if(value === item.title ){
          switch(status){
            case "play":
              item.playingStatus = true ;
              this.setState({nowPlayVideo:value})
              break;
            case "pause":
              item.playingStatus = false ;
              break;
            case "stop":
              item.playingStatus = false ;
              item.percent = 0 ;
              break;
            default :
            break;
          }    
      } else {
        item.playingStatus = false ;
        item.percent = 0 ;
      }
      return item
    });
    this.setState({
      videoList : video
    })
  }

  confirmPlayer =(title,index)=> {
    confirm({
        title: `是否播放视频：${title}?`,
        // icon: <ExclamationCircleOutlined />,
        // content: 'Some descriptions',
        centered: true,
        okText:"播放",
        cancelText:"暂停",
        onOk:()=> {
          const params = {"open":this.props.server,'index' : index + 1, "status": 0};
          axios.post('playerControl/socket.php', params).then(res => console.log(res.data)); 
          this.timerStart(title);          
        },
        onCancel:()=> {
          if(title === this.state.nowPlayVideo){
            const params = {"open":this.props.server,'index' : index + 1, "status": 1};
            axios.post('playerControl/socket.php', params).then(res => console.log(res.data)); 
            this.timerPause(title);
          }
        },
      });
  }

    // 播放
    timerStart =(title)=>  {
      this.playerControl(title,"play") 
      clearInterval(timer); 
      timer = setInterval(() => this.record(), 1000);
    }
    // 暂停
    timerPause =(title)=> {
      this.playerControl(title,"pause")
      clearInterval(timer);
    }
  
    // 结束
    playerStop =(title)=> {
      clearInterval(timer);
      this.playerControl(title,"stop")
    }
  
    // 进度条
    record = () => {
      let video = this.state.videoList.map((item) => {
        if(this.state.nowPlayVideo === item.title ){
          if(item.percent <100 ){
            let time = 1/this.format(item.duration)*100;
            item.percent = item.percent + time;
            // console.log(item.percent,"进度")
          } else {
            this.playerStop();
          }
        } 
        return item
      });
      this.setState({
        videoList : video
      })
    }

    format=(time)=> {
        // let time = '00:02:10';
        let hour = time.split(':')[0];
        let min = time.split(':')[1];
        let sec = time.split(':')[2];

        let s = Number(hour*3600) + Number(min*60) + Number(sec);
        console.log(s);//130
        return s;
    }
  

  render(){
    let dataList = this.state.videoList.map((item,index) => {
      return (
        <Col span={5} style={{marginBottom:30}} key={index} onClick={()=>{this.confirmPlayer(item.title,index)}}>
          <VideoCard
              key={index}
              index={index}
              {...item}
              onRef={this.onRef}
              playerControl={this.playerControl} 
          ></VideoCard>          
        </Col>)
    });

    return(
      <div>
        <Row justify="space-around" align="middle" style={{marginTop:64}}>
            {dataList}
        </Row>
      </div>)
  }

}


export default VideoList;