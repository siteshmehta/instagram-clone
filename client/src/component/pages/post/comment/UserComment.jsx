const UserComment  = (props) => {
    
    return (
        <>
            <div className="flex flex-row justify-start space-x-2 border m-2">
                    <div className="w-10 h-10">
                        <img className="" src="https://cdn1.iconfinder.com/data/icons/colored-social-media-set-volume-1/512/instagram-256.png" alt="user profile"/>
                    </div>
                {/* </div> */}
                <div className="">
                    <span className="font-semibold mr-2">Aman</span> 
                    <span className="font-thin">This is {props?.id+1} comment on my post .</span>
                </div>
            </div>
        </>
    )
}
export default UserComment;