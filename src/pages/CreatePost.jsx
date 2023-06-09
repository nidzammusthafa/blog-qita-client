import React, { useState, useContext } from 'react'
import { UserContext } from '../store/UserContext'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom'
import Editor from '../components/Editor'
axios.defaults.withCredentials = true

const CreatePost = () => {
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [content, setContent] = useState('')
	const [files, setFiles] = useState('')
	const [redirect, setRedirect] = useState(false)
	const [category, setCategory] = useState('')
	const [tag, setTag] = useState('')
	const navigate = useNavigate()
	const { userInfo } = useContext(UserContext)

	const categories = category.split(',')
	const tags = tag.split(',')

	const createNewPost = async (e) => {
		e.preventDefault()
		const data = new FormData()
		data.set('title', title)
		data.set('summary', summary)
		data.set('content', content)
		data.set('categories', categories)
		data.set('tags', tags)
		data.set('file', files[0])

		const response = await axios.post('http://localhost:4000/api/post', data, {
			withCredentials: true,
		}).then(res => {
				setRedirect(true)
			})
			.catch(err => console.log(err))
	}

	if(redirect || !userInfo?.isWriter) {
		return navigate('/')
	}

	return (
		<form onSubmit={createNewPost} encType="multipart/form-data">
			<input
				type="title"
				placeholder={'Title'}
				value={title}
				onChange={e => setTitle(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<input
				type="summary"
				placeholder={'Summary'}
				value={summary}
				maxLength="200"
				onChange={e => setSummary(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<input
				type="file"
				name="file"
				onChange={e => setFiles(e.target.files)}
				className="w-full bg-gray-300 rounded shadow-lg"
			/>
			<Editor
				value={content}
				onChange={setContent}
			/>
			<input
				type="category"
				placeholder={'Category (pisahkan dengan koma space (", "))'}
				value={category}
				onChange={e => setCategory(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<input
				type="tag"
				placeholder={'Tag (pisahkan dengan koma space (", "))'}
				value={tag}
				onChange={e => setTag(e.target.value)}
				className="block mb-[5px] w-full p-[5px] border-b-gray-400 border-solid border-2 rounded"
			/>
			<button className="mt-2 w-full bg-gray-600 text-white rounded shadow-lg">Post</button>
		</form>
	)
}

export default CreatePost