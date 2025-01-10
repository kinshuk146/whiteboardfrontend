import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ uuid, socket, setUser }) => {
    const [roomId, setRoomId] = useState(uuid());
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleCreateRoom = (e) => {
        e.preventDefault();

        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter: true
        }
        console.log(roomData);
        setUser(roomData);
        socket.emit("userJoined", roomData);
        navigate(`/${roomId}`)
    }
    return (
        <form className="form col-md-12 mt-5 " onSubmit={handleCreateRoom}>
            <div className="form-group">
                <input type="text" className="form-control my-2" required placeholder="Enter your name" value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div className="form-group  border-1">
                <div className="input-group d-flex align-items-center justify-content-center border border-2">
                    <input
                        type="text"
                        className="form-control my-2 border-0"
                        value={roomId}
                        placeholder="Generate room code"
                        disabled
                    >
                    </input>
                    <div className="input-group-append ">
                        <button className="btn btn-primary btn-sm me-1" type="button" onClick={() => setRoomId(uuid())}>
                            Generate
                        </button>
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-4 btn btn-primary btn-block form-control">Generate Room</button>
        </form>
    )
}

export default CreateRoomForm
