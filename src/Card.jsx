
export default function Card(props) {

    function sendTo(page) {

    }

    return(

        <div
            style={{
                width: '111px',
                height: '170px',
                marginRight: '20px',
                display: 'flex', flexDirection: 'column'
            }}  className={'pointer'}

            onClick={sendTo(props.id)}
        >
            <img src={props.image} alt={''} style={{width: '100%', height: '100px', backgroundColor: 'black'}} />
            <label style={{fontSize: '0.5em'}}>{props.type}</label>
            <label className={'ellipsis'} style={{fontSize: '0.9em', fontWeight: 'bold'}}>{props.title}</label>
            <label style={{fontSize: '0.7em'}}>{props.release}</label>
            <label style={{fontSize: '0.6em'}}>{props.rating}</label>
        </div>

    );
}
