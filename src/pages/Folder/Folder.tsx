import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import iconClose from "../../assets/images/close.svg"
import { db } from "../../common/Model"
import Search from "../../components/Search/Search"
import { fetchFolder, selectFolder } from "../../reducer/folder"
import "./Folder.scss"

function Folder() {
    const [showModal, setShowModal] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const folderSelector = useSelector(selectFolder)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    function createFolder() {
        db.addFolder(inputValue)
        setShowModal(false)
        dispatch(fetchFolder())
    }

    function changeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    return <div className="folder">
        <div className="folder__topbar">
            <div className="folder__search">
                <Search></Search>
            </div>

            <div className="folder__create" onClick={() => { setShowModal(true) }}>
                新建文件夹
            </div>
        </div>
        <div className="folder__body">
            <div className="folder__title">全部分类 ({folderSelector.folderList.length})</div>
            <div className="folder__list">
                {folderSelector.folderList.map(item =>
                    <div key={item.id}
                        className="folder__item">{item.name} <span>(1)</span></div>
                )}

            </div>
        </div>
        {showModal && <div className="modal" >
            <div className="modal__content">
                <div className="modal__title">新建文件夹</div>
                <div className="modal__close">
                    <img src={iconClose} onClick={() => { setShowModal(false) }}></img>
                </div>
                <div className="modal__input">
                    <input onChange={(e) => { changeInputValue(e) }}></input>
                </div>
                <div className="modal__footer">
                    <div className="modal__button cancel" onClick={() => { setShowModal(false) }}>取消</div>
                    <div className="modal__button" onClick={() => { createFolder() }}>完成</div>
                </div>
            </div>
        </div>}
    </div>
}

export default Folder