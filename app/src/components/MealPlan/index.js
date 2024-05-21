import {
  Button,
  Eventcalendar,
  Input,
  Popup,
  Segmented,
  SegmentedGroup,
  setOptions,
  Snackbar,
  Textarea,
} from "@mobiscroll/react";
import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import mealApi from "api/menus";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./style.css"
setOptions({
  theme: "ios",
  themeVariant: "light",
});

const types = [
  {
    id: "Breakfast",
    name: "Bữa sáng",
    color: "#e20f0f",
    kcal: "300 - 400 kcal",
    icon: "🍳",
  },
  {
    id: "Lunch",
    name: "Bữa trưa",
    color: "#157d13",
    kcal: "200 - 400 kcal",
    icon: "🥨",
  },
  {
    id: "Snack",
    name: "Bữa xế",
    color: "#32a6de",
    kcal: "100 - 200 kcal",
    icon: "🍌",
  },
  {
    id: "Dinner",
    name: "Bữa tối",
    color: "#e29d1d",
    kcal: "400 - 600 kcal",
    icon: "🍜",
  },
];

const viewSettings = {
  timeline: {
    type: "week",
    eventList: true,
  },
};

const responsivePopup = {
  medium: {
    display: "center",
    width: 400,
    fullScreen: false,
    touchUi: false,
    showOverlay: false,
  },
};
const vietnameseWeekdays = {
  "Monday": "Thứ 2",
  "Tuesday": "Thứ 3",
  "Wednesday": "Thứ 4",
  "Thursday": "Thứ 5",
  "Friday": "Thứ 6",
  "Saturday": "Thứ 7",
  "Sunday": "Chủ Nhật"
};

const vietnameseMonths = {
  "January": "Tháng 1",
  "February": "Tháng 2",
  "March": "Tháng 3",
  "April": "Tháng 4",
  "May": "Tháng 5",
  "June": "Tháng 6",
  "July": "Tháng 7",
  "August": "Tháng 8",
  "September": "Tháng 9",
  "October": "Tháng 10",
  "November": "Tháng 11",
  "December": "Tháng 12"
};

const formatDateToVietnamese = (date) => {
  const options = { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  const dateParts = dateFormatter.formatToParts(date);

  let day = '';
  let weekday = '';
  let month = '';
  let year = '';

  dateParts.forEach(part => {
    switch (part.type) {
      case 'day':
        day = part.value;
        break;
      case 'weekday':
        weekday = vietnameseWeekdays[part.value];
        break;
      case 'month':
        month = vietnameseMonths[part.value];
        break;
      case 'year':
        year = part.value;
        break;
      default:
        break;
    }
  });

  return `${day} ${weekday} ${month} ${year}`;
};
function App() {
  const [myMeals, setMyMeals] = useState([]);
  const [tempMeal, setTempMeal] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [total_calo, settotal_calo] = useState("");
  const [cuisine, setcuisine] = useState("");
  const [headerText, setHeader] = useState("");
  const [type, setType] = useState(1);

  const convertMongoDate = (mongoDate) => {
    // Split the date string into its components
    const components = mongoDate.split("-");
  
    // Extract year, month, and day from the components
    const year = "20" + components[2];
    const month = components[1];
    const day = components[0];
  
    // Return the date string in the desired format
    return `${year}-${month}-${day}T00:00:00.000+00:00`;
  };

  const saveEvent = useCallback(async () => {
  try {
    // Log the current temporary meal
    console.log("Temp meal:", tempMeal);

    // Find the meal_day document that contains the meal
    const mealDay = myMeals.find((mealDay) =>
      mealDay.meal_plan.some((meal) => meal.name === tempMeal.name)
    );

    // Log the found meal day
    console.log("Found meal day:", mealDay);

    if (!mealDay) {
      throw new Error("Meal day not found");
    }

    // Update the specific meal within the meal_plan array
    const updatedMealPlan = mealDay.meal_plan.map((meal) =>
      meal.name === tempMeal.name
        ? {
            ...meal,
            name: name,
            total_calo: total_calo,
            cuisine: cuisine,
            meal_time: tempMeal.meal_time,
          }
        : meal
    );

    // Log the updated meal plan
    console.log("Updated meal plan:", updatedMealPlan);

    const updatedMealDay = {
      ...mealDay,
      meal_plan: updatedMealPlan,
    };

    // Log the updated meal day before sending to the server
    console.log("Updated meal day to be sent:", updatedMealDay);

    // Send the updated meal_day to the server
    await mealApi.updateMenu(mealDay._id, updatedMealDay);

    // Log the response from the server
    console.log("Successfully updated meal day on server");

    // Update the state with the modified meal_day
    const updatedMeals = myMeals.map((day) =>
      day._id === mealDay._id ? updatedMealDay : day
    );

    setMyMeals(updatedMeals);
    setPopupOpen(false);
    window.location.reload();
  } catch (error) {
    console.error("Error saving event:", error);
  }
}, [total_calo, myMeals, name, cuisine, tempMeal]);



 // 2 delete
 const deleteEvent = useCallback(async (event) => {
  try {
    await mealApi.deleteMenu(event.id);
    setMyMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== event.id));
    window.location.reload();
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}, []);


const loadPopupForm = useCallback((event) => {
  setName(event.name);
  settotal_calo(event.total_calo);
  setcuisine(event.cuisine);
}, []);


  // allow user to edit
  const nameChange = useCallback((ev) => {
    setName(ev.target.value);
  }, []);

  const total_caloChange = useCallback((ev) => {
    settotal_calo(ev.target.value);
  }, []);

  const cuisineChange = useCallback((ev) => {
    setcuisine(ev.target.value);
  }, []);


  const onDeleteClick = useCallback(() => {
    deleteEvent(tempMeal);
    setPopupOpen(false);
  }, [deleteEvent, tempMeal]);


  const handleEventClick = useCallback(
    (args) => {
      const event = args.event;
      setType(event.resource);
      setEdit(true);
      setTempMeal({ ...event });
      loadPopupForm(event);
      setPopupOpen(true);
    },
    [loadPopupForm]
  );


  const typeChange = useCallback(
    (ev) => {
      const value = +ev.target.value;
      setType(value);
      setTempMeal({ ...tempMeal, meal_time: value });
    },
    [tempMeal]
  );


  const handleEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent]
  );

  // const popupButtons = useMemo(() => {
  //   if (isEdit) {
  //     return [
  //       "cancel",
  //       {
  //         handler: () => {
  //           saveEvent();
  //         },
  //         keyCode: "enter",
  //         text: "Save",
  //         cssClass: "mbsc-popup-button-primary",
  //       },
  //     ];
  //   } else {
  //     return [];
  //   }
  // }, [isEdit, saveEvent]);

  const onPopupClose = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const renderMyResource = (resource) => (
    <div className="md-meal-planner-cont">
      <div className="md-meal-planner-title" style={{ color: resource.color }}>
        <span
          className="md-meal-planner-icon"
          dangerouslySetInnerHTML={{ __html: resource.icon }}
        ></span>
        {resource.name}
      </div>
      <div className="md-meal-planner-kcal">{resource.kcal}</div>
    </div>
  );

  const myScheduleEvent = useCallback((args) => {
    const event = args.original;
    return (
      <div className="md-meal-planner-event">
        <div className="md-meal-planner-event-title">
          {event.name}
        </div>
      </div>
    );
  }, []);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const menuData = await mealApi.getAllMenus();
        const parsedMenuData = menuData.map((meal) => ({
          ...meal,
          meal_day: convertMongoDate(meal.meal_day),
        }));
        setMyMeals(parsedMenuData);
        console.log(parsedMenuData);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    }
    fetchMeals();
  }, []);


  return (
    <div>
      <Eventcalendar
        view={viewSettings}
        data={myMeals.flatMap((meal) =>
          meal.meal_plan.map((submeal) => ({
            id: submeal._id,
            start: new Date(meal.meal_day),
            name: submeal.name,
            total_calo: submeal.total_calo,
            cuisine: submeal.cuisine,
            resource: submeal.meal_time,
          }))
        )}
        
        resources={types}
        dragToCreate={false}
        dragToResize={false}
        dragToMove={true}
        clickToCreate={false}
        onEventClick={handleEventClick}
        onEventDeleted={handleEventDeleted}
        renderResource={renderMyResource}
        renderScheduleEventContent={myScheduleEvent}
        cssClass="md-meal-planner-calendar"
        dateFormatter={formatDateToVietnamese} 
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        // buttons={popupButtons}
        isOpen={isPopupOpen}
        onClose={onPopupClose}
        responsive={responsivePopup}
        cssClass="md-meal-planner-popup"
      >
        <SegmentedGroup onChange={typeChange} value={type}>
          {types.map((type) => (
            <Segmented value={type.id} key={type.id}>
              {type.name}
            </Segmented>
          ))}
        </SegmentedGroup>
        <div className="mbsc-form-group">
          <Input label="Tên món ăn" value={name} onChange={nameChange} />
          <Input label="Năng lượng" value={total_calo} onChange={total_caloChange} />
          <Textarea label="Ẩm thực" value={cuisine} onChange={cuisineChange} />
        </div>
        {/* {isEdit && (
          <div className="mbsc-button-group">
            <Button
              className="mbsc-button-block"
              color="danger"
              variant="outline"
              onClick={onDeleteClick}
            >
              Xóa bữa ăn
            </Button>
          </div>
        )} */}
      </Popup>
    </div>
  );
}

export default App;
