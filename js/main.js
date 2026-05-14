const user = JSON.parse(localStorage.getItem("current"))
alert(`hi ${user.name} \n your wins: ${user.wins} \nyour fails: ${user.fails}`)
// המערך הנכון
const rightArr = [0, 0, 0, 0]
// הגרלת מספרים לתוכו
for (let i = 0; i < rightArr.length; i++) {
    rightArr[i] = Math.floor(Math.random() * 6 + 1)
}

// סתם בשביל לראות מה הנכון...
console.log("right " + rightArr);

// תפיסת אלמנטים
const arrTryColors = []
for (let i = 1; i < 5; i++) {
    const c = document.querySelector(".color" + i)
    arrTryColors.push(c)
}

const colorsDiv = document.querySelector(".colorsChoise")
const button = document.querySelector("button")
const message = document.querySelector(".message")
const bod = document.querySelector("body")
const title = document.querySelector(".title")
const times = document.querySelector(".times")
//div להצגת הניסיונות
const arrTimes = []
for (let i = 1; i < 8; i++) {
    const t = document.querySelector(".time" + i)
    arrTimes.push(t)
}

// ה'קוד' של כל צבע- 
// red = 1
// blue = 2
// black = 3
// yellow = 4
// green = 5
// pink = 6

// מערך של כל הצבעים- לפי סדר
const arrColors = ["red", "blue", "black", "yellow", "green", "pink"]

// מערך של הניחוש הנוכחי
const arrChoose = [0, 0, 0, 0]

//הוספת ארועים לכל הדיבים של בחירת הצבעים
// לעבוד בלולאה על מערך ה color
for (let i = 0; i < arrTryColors.length; i++) {
    arrTryColors[i].addEventListener("click", () => {
        // שליחה לפונקציה שמביאה אופציות של צבעים 
        addChoosingColor(arrTryColors[i], i);
    })
}

// פונקציה שמביאה צבעים לבחירה-דיבים קטנים בכל הצבעים האפשריים
const addChoosingColor = (color, n) => {
    const createColors = [];
    // כאן הפונקציה יוצרת את הצבעים
    for (let i = 0; i < arrColors.length; i++) {
        const col = document.createElement("div")
        col.style.width = "40px"
        col.style.height = "40px"
        col.style.backgroundColor = arrColors[i];
        color.append(col)
        createColors.push(col)
    }

    // פונקציה שמסירה את הצבעים לבחירה
    const removeColors = () => {
        for (let i = 0; i < createColors.length; i++) {
            createColors[i].remove()
        }
    }

    // הוספת ארוע לכל צבע בחירה-
    // משנה את צבע הרקע של הדיב הנבחר ומכניס למערך הניחושים את הצבע הנבחר
    for (let i = 0; i < createColors.length; i++) {
        createColors[i].addEventListener("click", () => {
            color.style.backgroundColor = arrColors[i]
            removeColors()
            arrChoose[n] = i + 1
        })
    }
    // סתם כדי לראות.....:)
    console.log(arrChoose);
}

//פונקציה שיוצרת את בכל לחיצה מה היה בפעם הקודמת.
//בעצם שומרת את הערכים של ניסיון הניחוש הקודם
const saving = (k) => {

    for (let i = 0; i < arrChoose.length; i++) {
        let thisColor
        arrColors.map((e, j) => {
            if (arrChoose[i] == (j + 1)) {
                thisColor = e
            }
        })
        
        const tryDiv = document.createElement("div")
        tryDiv.style.backgroundColor = thisColor
        tryDiv.style.width = "50px"
        tryDiv.style.height = "50px"
        arrTimes[k].append(tryDiv)
    }
    const h3 = document.createElement("h3")
    h3.textContent = message.textContent
    arrTimes[k].append(h3)
}

// ארוע של לחיצה על 'אולי עכשיו' 
// כל פעם שלוחצים זה בעצם ניחוש אחד
// ויש 7 ניחושים

k = 1;
let rightPosition = 0
button.addEventListener("click", () => {
    let rightColors = 0
    rightPosition = 0
    if (k < 8) {
        let arrFlags = [false, false, false, false]
        for (let i = 0; i < rightArr.length; i++) {
            if (rightArr[i] == arrChoose[i] && !arrFlags[i]) {
                rightPosition++;
                arrFlags[i] = true;
            }

            else {
                for (let j = 0; j < rightArr.length; j++) {
                    if (arrChoose[i] == rightArr[j] && !arrFlags[j]) {
                        rightColors++;
                        arrFlags[j] = true;
                        break;
                    }
                }
            }
        }
        message.textContent = `${rightColors} colors are right but not in their position! and ${rightPosition} of them in their position!!`
        console.log(k);
        saving(k - 1)
        k++;
    }
    else {
        alert("Game Over\n נגמרו לך ניסיונות הניחוש\n מחזירים אותך לכל המשחקים")
        message.textContent = "נגמרו לך ניסיונות הניחוש"
        user.fails++
        localStorage.setItem("current",JSON.stringify(user))
        document.location.href="./games.html"
    }

    if (rightPosition == 4) {
        message.textContent = "\nGreat!!! You did it!!!!!"
        colorsDiv.style.display = "none"
        times.style.display = "none"
        button.style.display = "none"
        bod.style.backgroundImage = 'url(../pictures/after.jpg)'
        title.textContent = "!!!!האור נדלק במעבדה"
        user.wins++
        localStorage.setItem("current",JSON.stringify(user))
        
    }
})