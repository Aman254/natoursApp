const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id) {
    return res.status(404).json({
      status: "fail",
      message: "Enter a valid Id",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: "Missing Name or Price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "sucess",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id * 1;
  const tour = tours.fing((el) => el.id === id);

  res.status(200).json({
    status: "sucess",
    data: {
      tour,
    },
  });
  console.log(tour);
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "sucess",
        data: {
          your: newTour,
        },
      });
    }
  );
  res.send("Done");
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "sucess",
    data: null,
  });
};
