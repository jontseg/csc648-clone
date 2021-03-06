import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Home from './Home';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import '@progress/kendo-theme-default/dist/all.css';  
import {useState} from 'react';
const categories = ["all", "recipe", "video", "article"];
function CreatePost() {
    let history = useNavigate();
    
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            //setListOfPosts(response.data);
            history('/', {replace: true});
        });
    };
    const initialValues = {
      title: "",
      postText: "",
      username: "",
      category: "",
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(20).required(),
        category: Yup.string().required(),
    });
    const [category, setCategory] = useState("");
  return (
    <div className="createPostPage">
      <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}>
        <Form className="formContainer">
            <label>Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field 
            id="inputCreatePost" 
            name="title" 
            placeholder="(Ex....Title)"
            />
            <label>Post: </label>
            <ErrorMessage name="postText" component="span" />
            <Field 
            id="inputCreatePost" 
            name="postText" 
            placeholder="(Ex....Post)"
            />
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field 
            id="inputCreatePost" 
            name="username" 
            placeholder="(Ex....John123)"
            />
            <label>Category: </label>
            <ErrorMessage name="category" component="span" />
            
            <Field 
            id="inputCreatePost" 
            name="category" 
            as="Select"
            >
              <option value="" selected disabled>Please Select</option>
              <option value="All">All</option>
              <option value="Tools">Tools</option>
              <option value="Hiking Gear">Hiking Gear</option>
              <option value="Bicycle Gear">Bicycle Gear</option>
              <option value="Snow Gear">Snow Gear</option>
              <option value="Climbing Gear">Climbing Gear</option>
              <option value="Silverware">Silverware</option>
              <option value="Other">Other</option>
            </Field>
            <button type="submit">
                Create A Post
            </button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
