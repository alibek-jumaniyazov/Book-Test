import React, { useContext, useRef, useState } from 'react'
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import { postBook } from '../../context/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
export default function CreateBook() {

    const [layout, setLayout] = useState(undefined);
    const [spinner, setSpinner] = useState('none');

    const isbnRef = useRef(null)
    const { books, setBooks } = useContext(UserContext);

    const CreateBooks = async () => {
        const body = {
            isbn: isbnRef.current.value
        }
        if (spinner == 'none') {
            setSpinner('spinner')
        }
        try {
            const response = await postBook(body)
            if (body.isbn !== '') {
                setLayout(undefined)
                console.log(response.data);
                setSpinner('none')
            }
            else {
                alert("Kitobni ISBN kodini yozing")
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Stack >

                <Button style={{ background: 'none', outline: 'none' }} onClick={() => {
                    setLayout('center');
                }}
                >
                    <button className='CreateBook'>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00001 3.83331V13.1666M3.33334 8.49998H12.6667" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Create a book
                    </button>

                </Button>
            </Stack>
            <Modal open={!!layout} onClose={() => setLayout(undefined)}>
                <ModalDialog layout={layout} style={{ background: '#FEFEFE', border: 'none', width: '430px', height: 'auto', padding: '24px 28px' }}>
                    <div className="createBookModal">
                        <div className="modalHeader">
                            <p>Create a book</p>
                            <ModalClose />
                        </div>
                        <div className="madalCardsInputs">
                            <div className="modalInput">
                                <p>Title</p>
                                <input type="text" name='title' placeholder='Enter your title' />
                            </div>

                            <div className="modalInput">
                                <p>Author</p>
                                <input type="text" name='author' placeholder='Enter your author' />
                            </div>

                            <div className="modalInput">
                                <p>Cover</p>
                                <input type="url" name='url' placeholder='Enter your cover' />
                            </div>

                            <div className="modalInput">
                                <p>Published</p>
                                <input type="date" name='date' placeholder="&#128197; Enter your published" />
                            </div>

                            <div className="modalInput">
                                <p>Pages</p>
                                <input type="text" name='text' placeholder='Enter your pages' />
                            </div>

                            <div className="modalInput">
                                <p>ISBN</p>
                                <input type="text" name='text' placeholder='Enter your book isbn' ref={isbnRef} />
                            </div>
                        </div>
                        <div className="modalButtons">
                            <Button onClick={() => setLayout(undefined)} style={{ background: '#fff', border: '1px solid #6200EE', width: '181px', height: '40px', color: '#6200EE' }} variant="outlined" >Close</Button>
                            <Button onClick={() => CreateBooks()} style={{ background: '#6200EE', border: 'none', width: '181px', height: '40px', color: '#fff' }} variant="contained"> <a>Submit</a> <div class={spinner}></div></Button>
                        </div>
                    </div>
                </ModalDialog>
            </Modal>
        </>
    )
}
