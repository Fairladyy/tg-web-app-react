import React, { useState } from "react";
import { useTelegram } from "../../Hooks/useTelegram";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
import { useCallback, useEffect } from "react";

const products = [
  {
    id: "1",
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "3",
    title: "Худи",
    price: 7000,
    description: "Красного цвета, из овечей шкуры",
  },
  {
    id: "4",
    title: "Рубашка",
    price: 3000,
    description: "Белого цвета, идеально для свадьбы",
  },
  {
    id: "5",
    title: "Носки",
    price: 500,
    description: "Чёрного цвета, вонять начнут через 3 дня, отвечаю",
  },
  {
    id: "6",
    title: "Трусы",
    price: 800,
    description: "Розового цвета, с сердечками<3",
  },
  {
    id: "7",
    title: "Шапка",
    price: 2000,
    description: "Чёрного цвета, мудацкая шапка",
  },
  {
    id: "8",
    title: "Кастрюля",
    price: 5000,
    description: "Чугунная, для плова - самое то",
  },
  {
    id: "9",
    title: "Замок для кастрюли",
    price: 300,
    description: "Стальной, кодовый, шоб цыгане в германии не спиздили",
  },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    const onSendData = useCallback(() => {
      const data = {
        products: addedItems,
        totalPrice: getTotalPrice(addedItems),
        queryId,
      };
      fetch("http://85.119.146.179:8000/web-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }, [addedItems]);

    useEffect(() => {
      tg.onEvent("mainButtonClicked", onSendData);
      return () => {
        tg.offEvent("mainButtonClicked", onSendData);
      };
    }, [onSendData]);

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };
  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem>
          product={item}
          onAdd={onAdd}
          className={"item"}
        </ProductItem>
      ))}
    </div>
  );
};

export default ProductList;
