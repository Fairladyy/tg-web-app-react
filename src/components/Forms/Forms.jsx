import React, { useEffect, useState } from "react";
import "./Forms.css";
import { useTelegram } from "../../Hooks/useTelegram";

const Forms = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  useEffect(() => {
    if (!street || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, city]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"forms"}>
      <h3>Введите ваши данные</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Страна"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Улица"}
        value={street}
        onChange={onChangeStreet}
      />
      <select value={subject} onChange={onChangeSubject} className={"select"}>
        <option value={"physical"}>Физ. лицо</option>
        <option value={"legal"}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Forms;
