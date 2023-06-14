import { Table} from 'antd'
import { useEffect, useState } from "react"
import { articles as getArticles, getArticle, removeArticle} from '../../service/storage-service'
import { useNavigate } from "react-router-dom"
function ArticleScratch() {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 80,
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 500,
            render: (text) => <a href="javascript: void(0)" target="_self" onClick={e =>edit(text,e)}>{text}</a>
        },
        {
            title: '操作',
            dataIndex: 'title',
            width: 500,
            render: (text) => <a href="javascript: void(0)" target="_self" onClick={e =>remove(text,e)}>删除</a>
        },

    ]
    useEffect(() => {
        loadArticles();

    }, []);
    const edit = async (title, e)=>{
        let content = await getArticle(title)
        navigate("/personal/article-write", { state: { title,content}})
    }
    const remove = async (title, e)=>{
        let content = await removeArticle(title)
        loadArticles()
    }
    const loadArticles = async () => {
        let as= await getArticles() ;
 
     
        setArticles(as)
        console.log("mounted!")
    }

    return (
      <Table
        columns={columns}
        dataSource={articles}

        bordered
      >
      </Table>
    )
}
export default ArticleScratch
