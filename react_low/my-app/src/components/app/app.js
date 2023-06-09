import React,{Component} from "react";
import AppHeader from '../app-header';
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                { label: "Learn English", important: true, like: false,  id: 1 },
                { label: "Learn Chines", important: false, like: false,  id: 2 },
                { label: "Going to learn React", important: false, like: false,  id: 3 }
            ],
            term: '',
            filter:'all'
        };
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLike = this.onToggleLike.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
        this.maxId = 4;
    }

    deleteItem(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem=>elem.id === id)
            let newData = [...data]
            newData.splice(index,1)
            return {
                data: newData
            }
        })
        console.log(id)
    }

    addItem(label){
        const newItem = {
            label : label,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) =>{
            let newData = [...data,newItem];
            return {
                data: newData
            }
        })
    }

    onToggleImportant(id){
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index];
            const newItem = { ...old, important: !old.important }

            const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newData
            }
        })
    }

    onToggleLike(id) {
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id)
            
            const old = data[index];
            const newItem = {...old,like: !old.like}

            const newData = [...data.slice(0,index),newItem,...data.slice(index+1)];

            return {
                data: newData
            }
        })
    }

    searchPost(items,term){
        if(term.length === 0){
            return items
        }
        return items.filter((item)=>{
            return item.label.indexOf(term) > -1
        })
    }

    filterPost(items, filter){
        if(filter === 'like'){
            return items.filter(item => item.like)
        } else {
            return items
        }
    }
    onFilterSelect(filter){
        this.setState({ filter })
    }
    onUpdateSearch(term){
        this.setState({term})
    }
    render(){
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        
        const visiblePosts = this.filterPost(this.searchPost(data,term), filter);

        return (
            <div className="app">
                <AppHeader 
                liked = {liked} 
                allPosts = {allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter 
                    filter = {filter}
                    onFilterSelect = {this.onFilterSelect} />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                />
                <PostAddForm 
                    onAdd = {this.addItem}
                />
            </div>

        )
    }
   
}