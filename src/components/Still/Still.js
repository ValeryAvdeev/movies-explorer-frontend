import './Still.css';

function Still(props) {
  return (
    <div className="still">
      <button className={`still-button ${props.hiddingButton && 'still-button_hidden'}`}
              type='button'
              onClick={props.onClick}
      >
        Ещё
      </button>
    </div>
  )
}

export default Still;
