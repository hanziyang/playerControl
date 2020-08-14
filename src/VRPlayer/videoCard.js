import React, { Component } from 'react';
import {Card, Progress, Row, Col } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

const { Meta } = Card;

class VideoCard extends Component {

  constructor(props){
    super(props);
    this.state = {

        percent: 0,

    }
  }
  componentDidMount(){
    this.props.onRef(`videoCard${this.props.index}`,this)
  }


  render(){

    // this.props.title 标题
    // this.props.srcImage 照片地址
    // this.props.videoTimes 视频时长
    // this.props.playingStatus 播放状态

    let icon = this.props.playingStatus ? <PauseOutlined /> : <CaretRightOutlined />;

    return(
        <div style={{textAlign:"center",padding:24,position:"relative", width:"420px",height:"260px", backgroundSize: '100% 100%', borderRadius:"10px", backgroundImage: 'url(' + this.props.srcImage + ')' }} >
            <Row justify="space-between" align="bottom" style={{position:"absolute",left:20 ,bottom:20, width:"100%"}}>
                <Col span={8}>
                    <Meta title={this.props.title}  style={{textAlign:"left"}} /> 
                </Col>
                <Col span={6}>
                    <Progress type="circle" percent={this.props.percent} format={percent => icon} width={40} /> 
                </Col>
            </Row>
        </div>

    )
  }

}


export default VideoCard;