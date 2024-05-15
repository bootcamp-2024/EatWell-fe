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
import menuApi from "api/menus";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
setOptions({
  theme: "ios",
  themeVariant: "light",
});

const types = [
  {
    id: 1,
    name: "Bữa sáng",
    color: "#e20f0f",
    kcal: "300 - 400 kcal",
    icon: "🍳",
  },
  {
    id: 2,
    name: "Bữa trưa",
    color: "#157d13",
    kcal: "100 - 200 kcal",
    icon: "🥨",
  },
  {
    id: 3,
    name: "Bữa xế",
    color: "#32a6de",
    kcal: "500 - 700 kcal",
    icon: "🍌",
  },
  {
    id: 4,
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

function App() {
  const [myMeals, setMyMeals] = useState([]);
  const [tempMeal, setTempMeal] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isDrag, setDrag] = useState(false);
  const [mealName, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");
  const [headerText, setHeader] = useState("");
  const [type, setType] = useState(1);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  
  // 1
  const saveEvent = useCallback(async () => {
    try {
      let newEvent;
  
      if (isEdit) {
        // If editing an existing meal, include the id
        newEvent = {
          id: tempMeal.id,
          mealName: mealName,
          calories: calories,
          notes: notes,
          start: tempMeal.start,
          resource: tempMeal.resource,
        };
      } else {
        // If adding a new meal, exclude the id
        newEvent = {
          mealName: mealName,
          calories: calories,
          notes: notes,
          start: tempMeal.start,
          resource: tempMeal.resource,
        };
      }
  
      let updatedMeals;
  
      if (isEdit) {
        // If editing an existing meal, update it
        const response = await menuApi.updateMenu(tempMeal.id, newEvent);
        updatedMeals = myMeals.map((meal) =>
          meal.id === tempMeal.id ? response.data : meal
        );
      } else {
        // If adding a new meal, create it
        const response = await menuApi.createMenu(newEvent);
        updatedMeals = [...myMeals, response.data];
      }
      setMyMeals(updatedMeals);
      setPopupOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  }, [calories, isEdit, myMeals, mealName, notes, tempMeal]);
  
  const handleDragStart = useCallback(() => {
    setDrag(true);
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDrag(false);
  }, []);
  const handleEventDrop = useCallback(
  async (args) => {
    if (!isDrag) return;
    try {
      // Update meal date
      const updatedMeals = myMeals.map((meal) =>
        meal.id === args.event.id
          ? { ...meal, start: args.newStart }
          : meal
      );
      console.log(updatedMeals); // Check if this logs correctly
      setMyMeals(updatedMeals);

      // Call backend API to update meal date
      await menuApi.updateMenu(args.event.id, {
        start: args.newStart,
      });
    } catch (error) {
      console.error("Error updating meal date:", error);
    }
  },
  [isDrag, myMeals]
);

  
  // 2 delete
  const deleteEvent = useCallback(async (event) => {
    try {
      await menuApi.deleteMenu(event.id); // Send request to delete the meal
      setMyMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== event.id)); // Remove the meal from state
      setSnackbarOpen(true); // Optionally, show a snackbar or confirmation message      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }, []);

  const loadPopupForm = useCallback((event) => {
    setName(event.mealName);
    setCalories(event.calories);
    setNotes(event.notes);
  }, []);

  // allow user to edit
  const nameChange = useCallback((ev) => {
    console.log("New name:", ev.target.value);

    setName(ev.target.value);
  }, []);

  const caloriesChange = useCallback((ev) => {
    console.log("New calories:", ev.target.value);

    setCalories(ev.target.value);
  }, []);

  const notesChange = useCallback((ev) => {
    setNotes(ev.target.value);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempMeal);
    setPopupOpen(false);
  }, [deleteEvent, tempMeal]);

  // scheduler options
  const handleEventClick = useCallback(
    (args) => {
      const event = args.event;
      // setHeader(event.mealName + '<div></div><div class="md-meal-type">' + formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>');

      setType(event.resource); // day cac chuoi ve buoi an trong ngay
      setEdit(true);
      setTempMeal({ ...event });
      // fill popup form with event data
      loadPopupForm(event);
      setPopupOpen(true);
    },
    [loadPopupForm]
  );
  // display info when creating meals
  const handleEventCreated = useCallback(
    (args) => {
      const event = args.event;
      // setHeader(
      //   '<div>' + event.mealName + '</div><div class="md-meal-type">' + formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>',
      // );
      setType(event.resource);
      setEdit(false);
      setTempMeal(event);
      // fill popup form with event data
      loadPopupForm(event);
      // open the popup
      setPopupOpen(true);
    },
    [loadPopupForm]
  );

  const typeChange = useCallback(
    (ev) => {
      const value = +ev.target.value;
      setType(value);
      setTempMeal({ ...tempMeal, resource: value });
    },
    [tempMeal]
  );

  const handleEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent]
  );

  // popup options
  const popupButtons = useMemo(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Save",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Add",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onPopupClose = useCallback(() => {
    if (!isEdit) {
      // refresh the list, if add popup was canceled, to remove the temporary event
      setMyMeals([...myMeals]);
    }
    setPopupOpen(false);
  }, [isEdit, myMeals]);
  
  // const extendMyDefaultEvent = useCallback(
  //   () => ({
  //     name: "New meal",
  //     allDay: true,
  //   }),
  //   []
  // );

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
  // info of a meal card
  const myScheduleEvent = useCallback((args) => {
    const event = args.original;
    return (
      // display meal as a tag on date cell
      <div className="md-meal-planner-event">
        <div className="md-meal-planner-event-title">{event.mealName}</div>
        {event.calories && (
          <div className="md-meal-planner-event-desc">
            Calories {event.calories} kcal
          </div>
        )}
      </div>
    );
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  
  // fetch data onto front-end
  useEffect(() => {
    async function fetchMenus() {
      try {
        const menuData = await menuApi.getAllMenus();
        // console.log("Retrieved menu", menuData);
        setMyMeals(menuData);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    }
    fetchMenus();
  }, []);
  // console.log("myMeals state:", myMeals);
  return (
    <div>
      <Eventcalendar
        view={viewSettings}
        data={myMeals.map((meal) => ({
          // mapping myMeals
          id: meal._id, //binding du lieu
          mealName: meal.mealName,
          start: meal.start,
          resource: meal.resource,
          notes: meal.notes,
          calories: meal.calories,
        }))}
        resources={types}
        dragToCreate={false}
        dragToResize={false}
        dragToMove={true}
        clickToCreate={true}
        // extendDefaultEvent={extendMyDefaultEvent}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
        onEventDeleted={handleEventDeleted}
        onEventDragStart={handleDragStart}
        onEventDragEnd={handleDragEnd}
        onEventDrop={handleEventDrop}
        renderResource={renderMyResource}
        renderScheduleEventContent={myScheduleEvent}
        cssClass="md-meal-planner-calendar"
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        buttons={popupButtons}
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
          {/* display info in popup form */}
        </SegmentedGroup>
        <div className="mbsc-form-group">
          <Input label="Name" value={mealName} onChange={nameChange} />
          <Input label="Calories" value={calories} onChange={caloriesChange} />
          <Textarea label="Notes" value={notes} onChange={notesChange} />
        </div>
        {isEdit && (
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
        )}
      </Popup>
      {/* <Snackbar
        message="Event deleted"
        isOpen={isSnackbarOpen}
        onClose={handleSnackbarClose}
        button={{
          action: () => {
            setMyMeals((prevEvents) => [...prevEvents, tempMeal]);
          },
          text: "Undo",
        }}
      /> */}
    </div>
  );
}

export default App;
