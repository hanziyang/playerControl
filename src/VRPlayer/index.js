import React, { Component } from 'react';
import {Tabs,} from 'antd';
import './index.css';
import bj from './bj.jpg';
import VideoList from './videoList';

const { TabPane } = Tabs;

class Player extends Component {

  constructor(props){
    super(props)
    this.state = {

      // 设备
      server: 0,

    }
  }
  componentDidMount(){
    // axios.post('playerControl/socket.php', {"open":true}).then(res => console.log(res.data)); 
  }

  fetchServer =(value)=> {
    this.setState({
      server: value
    })
  }


  render(){

    return(
      <div style={{position:"absolute",width:"100%",top:0,bottom:0,paddingTop:96,textAlign:"center",margin:"auto", backgroundImage:'url(' + bj + ')'}}>
        <h1 style={{color: "white"}}>航 空 航 天 VR 体 验</h1>
        <Tabs defaultActiveKey="1" centered size={"large"} style={{color: "white"}} onChange={this.fetchServer}>
          <TabPane tab="Tab 1" key="1">
              <VideoList server={1} />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <VideoList server={2} />
          </TabPane>
        </Tabs>
      </div>)
  }

}


export default Player;