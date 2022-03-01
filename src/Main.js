import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {BiLinkExternal} from 'react-icons/bi';

const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey`;

const Main = () => {

    const[books , setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () =>{
            const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=XfAi66mbtGDeyj6ywyFVR2zUyGoyAGoE`);
            console.log(res.data.results.books);
            setBooks(res.data.results.books);
        }
        fetchBooks();
    },[])

  return (
    <div className='main'>
        <section className="grid grid-cols-1 gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => {
                const { author , book_image, buy_links , description , primary_isbn10 , publisher , rank , title } = book;
                return(
                    <article key = {rank} className="bg-green-100 py-5 px-10 rounded-lg">
                        <div>
                            <img src={book_image} alt={title} 
                            className="block mx-auto w-1/10"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold my-2 text-2xl">{title}</h3>
                            <p className="mb-4">{description}</p>
                            <p><span className="font-bold">
                                Author :
                                </span> {author}</p>
                        </div>
                        <ul>
                            <li><span className="font-bold">
                                Publisher : 
                                </span> {publisher}</li>
                            <li><span className="font-bold">
                                ISBN : 
                                </span> {primary_isbn10}</li>
                        </ul>
                        <ul>
                            <p>Buy Now:</p>
                            {buy_links.map((link) => {
                                const { name , url } = link;
                                return(
                                    <div key={name}>
                                        <a href={url} className="flex items-center" target="_blank" rel="noopenner noreferrer">{name}<BiLinkExternal className="ml-1"/></a>
                                    </div>
                                )
                            })}
                        </ul>
                    </article>
                )
            })}
        </section>
        
    </div>
  )
}

export default Main