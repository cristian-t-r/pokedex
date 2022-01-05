const Card = (props) => {
    console.log(props);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let pokemonName = capitalizeFirstLetter(props.props.name);

    return(
       /* <div className="card-container"> */
       <div className="card">
            <div className="sprite">
                <img alt={props.props.name} src={props.props.sprites.other.home.front_default}>

                </img>
            </div>
            <h2 className="dex-id">#{props.props.id}</h2>
            <h1>{pokemonName}</h1>
        </div>
    );
}

export default Card;
