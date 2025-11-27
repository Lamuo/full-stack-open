export default function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header props={course.name} />
      <Content props={course.parts} />
      <Total props={course.parts} />
    </div>
  );
}

const Header = ({ props }) => {
  return <h1>{props}</h1>;
};

const Content = ({ props }) => {
  return props.map((element) => (
    <Part
      key={element.name}
      part={element.name}
      exercises={element.exercises}
    />
  ));
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ props }) => {
  return (
    <p>
      {`Number of exercises ${props.reduce(
        (sum, part) => sum + part.exercises,
        0
      )}`}
    </p>
  );
};
