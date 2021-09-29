import express from "express";
import mongoose from "mongoose";
import csvToJson from "convert-csv-to-json";
import PlayerModel from "./models/player";
import RoasterMember from "./models/roasterMember";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.post("/roaster", async (req, res) => {
  console.log("route hits");
  const reqBody = req.body.csvFile;
  // console.log(reqBody);
  let arr = [];

  for (let i = 1; i < reqBody.length - 1; i++) {
    const obj = {
      ID: reqBody[i][0],
      FirstName: reqBody[i][1],
      LastName: reqBody[i][2],
      DOB: reqBody[i][3],
      SquadNumber: reqBody[i][4],
      Position: reqBody[i][5],
    };
    arr.push(obj);
  }

  arr.map((d) => {
    PlayerModel.findOne({ ID: d.ID }, (err, docs) => {
      if (!docs) {
        PlayerModel.insertMany([
          {
            ID: d.ID,
            FirstName: d.FirstName,
            LastName: d.LastName,
            DOB: d.DOB,
          },
        ]).then((data) => {
          console.log(data[0]);
          RoasterMember.insertMany([
            {
              player: data[0]._id,
              squadNumber: d.SquadNumber,
              note: "lore ipsum dolern sitten",
              position: d.Position,
            },
          ]);
        });
      } else {
        RoasterMember.find({}, (err, doc) => {
          if (doc) {
            console.log(doc.length);
            doc.map((dsx) => {
              PlayerModel.findOne({ _id: dsx.player }, (err, doc) => {
                if (!doc) {
                  RoasterMember.insertMany([
                    {
                      player: docs._id,
                      squadNumber: d.SquadNumber,
                      note: "lore ipsum dolern sitten",
                      position: d.Position,
                    },
                  ]).then((data) => console.log("else roaster => ", data));
                }
              });
            });
          }
        });
      }
    });
  });

  res.json({ message: "hi" });
});

//-------just for inserting player and update them if next time their property will change--------//

// app.post("/", async (req, res) => {
//   console.log("route hits");
//   const reqBody = req.body.csvFile;
//   console.log(reqBody);
//   let arr = [];
//   let fetchedData = [];

//   for (let i = 1; i < reqBody.length - 1; i++) {
//     const data = PlayerModel.find(
//       { ID: reqBody[i][0] },
//       async function (err, docs) {
//         if (!docs) {
//           const obj = {
//             ID: reqBody[i][0],
//             FirstName: reqBody[i][1],
//             LastName: reqBody[i][2],
//             DOB: reqBody[i][3],
//             SquadNumber: reqBody[i][4],
//             Position: reqBody[i][5],
//           };
//           arr.push(obj);
//           fetchedData.push({
//             player: "",
//             squadNumber: "",
//             note: "",
//             position: "",
//           });
//           // console.log("arr <><>< ", arr);

//           try {
//             await PlayerModel.insertMany(arr)
//               .then(function () {
//                 console.log("Data inserted"); // Success
//               })
//               .catch(function (error) {
//                 console.log(error); // Failure
//               });
//           } catch (error) {
//             console.log("error => ", error);
//           }
//           await RoasterMember.insertMany(arr)
//             .then(function () {
//               console.log("Data inserted"); // Success
//             })
//             .catch(function (error) {
//               console.log(error); // Failure
//             });
//         } else {
//           let doc = await PlayerModel.findOneAndUpdate(
//             { ID: reqBody[i][0] },
//             {
//               FirstName: reqBody[i][1],
//               LastName: reqBody[i][2],
//               DOB: reqBody[i][3],
//               SquadNumber: reqBody[i][4],
//               Position: reqBody[i][5],
//             },
//             {
//               new: true,
//               upsert: true, // Make this update into an upsert
//             }
//           );
//         }
//       }
//     );
//   }

//   res.json({ data: "post route" });
// });

mongoose
  .connect(
    `mongodb+srv://drcyberx:drcyberx@cluster0.yyra3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("the server is up at port 4000");
    });
  });
