import style from "../styles/order.module.css";
import moment from "moment";
// { amount, amount_shipping, images, items, timestamps, _id }
function Order({ order }) {
  const { amount, amount_shipping, images, items, timestamps, _id } = order;
  return (
    <div className={style.order}>
      <div className={style.order__col1}>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "15px" }}>
            <p className={style.order__headerText}>order placed</p>
            <p>{moment.unix(timestamps).format("DD MMM YYYY")}</p>
          </div>

          <div>
            <p className={style.order__headerText}>total</p>
            <p>
              ${amount} - next day delivery ${amount_shipping}
            </p>
          </div>
        </div>

        <p className={style.order__length}>{items?.length} items</p>

        <p className={style.order__id}>order # {_id}</p>
      </div>

      <div className={style.order__col2}>
        {images.map((image, index) => (
          <img key={index} src={image} alt="your order image" />
        ))}
      </div>
    </div>
  );
}

export default Order;
