import React, { useCallback, useEffect, useState } from "react";
import "./Forms.css";
import { useTelegram } from "../../Hooks/useTelegram";

const Forms = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, city, street, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  useEffect(() => {
    if (!country || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
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
      <select value={country} className={"select"} onChange={onChangeCountry}>
        <option value={"Latvia"}>Латвия</option>
        <option value={"Russia"}>Россия</option>
      </select>
      <input
        className={"input"}
        type="text"
        placeholder={"Город"}
        value={city}
        onChange={onChangeCity}
      ></input>
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
