import css from "./style.module.css";

function Block({ arg1, arg2, arg3,arg4,arg5,arg6,icone1,icone2,icone3 }) {
  const h1 = arg1 ? new Date(arg1 * 1000).getHours() : "";
  const h2 = arg2 ? new Date(arg2 * 1000).getHours() : "";
  const h3 = arg3 ? new Date(arg3 * 1000).getHours() : "";

 

  return (
    <div className={css.boxWeather}>
      <div className={css.boxW}>
        <p className={css.temp1}>{`${arg4}°C`}</p>
        <div className={css.iconeBox1}>{icone1}</div>
        <p className={css.hours}>{h1 !== "" ? `${h1}h` : "-"}</p>
      </div>

      <div className={css.boxW}>
        <p className={css.temp1}>{`${arg5}°C`}</p>
        <div className={css.iconeBox1}>{icone2}</div>
        <p className={css.hours}>{h2 !== "" ? `${h2}h` : "-"}</p>
      </div>

      <div className={css.boxW}>
        <p className={css.temp1}>{`${arg6}°C`}</p>
        <div className={css.iconeBox1}>{icone3}</div>
        <p className={css.hours}>{h3 !== "" ? `${h3}h` : "-"}</p>
      </div>
    </div>
  );
}

export default Block;
