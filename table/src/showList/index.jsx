import React , {Component} from 'react'
import {Table , Button , Modal , Tooltip , Input} from 'antd'
import './index.css'
const Search = Input.Search;
let allList = [];
class ShowList extends Component{
    state = {
        list:[],
        visible:false,
        proList:[],
        val:''
    }
    proCol = [
        {
            title:'类型',
            dataIndex:'type',
            key:'type'
        },
        {
            title:'url地址',
            key:'url',
            dataIndex:'url'
        }
    ]
    columns = [
        {
            title:'name',
            dataIndex:'name',
            key:'name'
        },
        {
            title:'description',
            dataIndex:'description',
            key:'description',
            render:des=>{
                return <Tooltip title={des}>
                    <span className="desText">{des}</span>
                </Tooltip>
            }
        },
        {
            title:'image',
            dataIndex:'image',
            key:'image',
            render:url=>{
                return <img alt="aa" src={url} />
            }
        },
        {
            title:'baseUrl',
            dataIndex:'baseURL',
            key:'baseUrl',
            render:url=>{
                return <a href={url}>链接</a>
            }
        },
        {
            title:'tags',
            dataIndex:'tags',
            key:'tags',
            render:tags=>{
                return <div className="tagsBox">
                    {
                        tags && tags.map(item=><i key={item}>{item}</i>)
                    }
                </div>
            }
        },
        {
            title:'properties',
            dataIndex:'properties',
            key:'properties',
            render:pros=>{
                return <Button className='tabBtn' onClick={()=>{this.showModal(pros)}}>显示</Button>
            }
        }
    ]
    showModal = (pros)=>{
        this.setState({
            visible:true,
            proList:pros
        })
    }
    hideModal = ()=>{
        this.setState({
            visible:false
        })
    }
    search = val=>{
        let list = allList.filter(item=>item.tags.indexOf(val) !== -1);
        console.log(list)
        this.setState({val,list:list});

    }
    render(){
        let {list,visible,proList,val} = this.state;
        let {columns , proCol} = this;
        return <div>
            <div className="search">
                <input placeholder="Basic usage" value={val} onChange={ev=>this.search(ev.target.value)} />
            </div>
            <div>
                <Table dataSource={list} rowKey={()=>Math.random()} columns={columns} />
            </div>
            
            <Modal
                title="属性详情"
                visible={visible}
                onOk={()=>{this.hideModal()}}
                onCancel={()=>{this.hideModal()}}
            >
                <Table rowKey={()=>Math.random()} dataSource={proList} columns={proCol} />
            </Modal>
        </div>
    }
    componentDidMount = ()=>{
        window.l = this;
        fetch('http://www.mocky.io/v2/5be3ced42f00006d00d9f13b ').then(response=>response.json()).then(data=>{
            let list = data.apis;
            console.log(list);
            allList = list;
            this.setState({list});
        }).catch(err=>console.log(err));
    }
}
export default ShowList;