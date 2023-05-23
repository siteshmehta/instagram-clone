const UserComment  = () => {
    return (
        <>
            <div className="flex flex-row mt-2 justify-start space-x-2 px-3">
                    <div className="min-w-[5%] w-[5%] h-10 ">
                        <img className="object-contain" src="https://cdn1.iconfinder.com/data/icons/colored-social-media-set-volume-1/512/instagram-256.png" alt="user profile"/>
                    </div>
                {/* </div> */}
                <div className="">
                    <span className="font-semibold">Aman</span> 
                    <span>This is first comment This is first commentThis is first commentThis is first commentThis is first commentThis is first commentThis is first commentThis is first commentThis is first commentThis is first commentThis is first commentThis is first comment</span>
                </div>
            </div>
            
        </>
    )
}
export default UserComment;