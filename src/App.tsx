import {
  Button,
  Card,
  Col,
  DatePicker,
  InputNumber,
  Row,
  Statistic,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import "./App.css";
import { getGameTimeString, getRealTimeLeftString } from "./helpers/dateHelper";

function App() {
  const [step, setStep] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [realTimeSeconds, setRealTimeSeconds] = useState(0);
  const [gameTimeSecondsStart, setGameTimeSecondsStart] = useState(
    dayjs()
      .set("hour", 12)
      .set("minute", 0)
      .set("second", 0)
      .toDate()
      .getTime() / 1000
  );
  const [gameTimeSeconds, setGameTimeSeconds] = useState(gameTimeSecondsStart);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const startSimulator = () => {
    setIsPause(false);
    setRealTimeSeconds(0);
    setGameTimeSeconds(gameTimeSecondsStart);
    setTimer(
      setInterval(() => {
        setRealTimeSeconds((prevRealTime) => prevRealTime + 1);
        setGameTimeSeconds((prevGameTime) => prevGameTime + step);
      }, 1000)
    );
    setIsStarted(true);
  };

  const stopSimulator = () => {
    clearInterval(timer!);
    setTimer(null);
    setIsPause(false);
    setIsStarted(false);
  };

  const pauseSimulator = () => {
    clearInterval(timer!);
    setTimer(null);
    setIsPause(true);
  };

  const resumeSimulator = () => {
    setTimer(
      setInterval(() => {
        setRealTimeSeconds((prevRealTime) => prevRealTime + 1);
        setGameTimeSeconds((prevGameTime) => prevGameTime + step);
      }, 1000)
    );
    setIsPause(false);
  };

  return (
    <div className="App">
      <Row gutter={24} justify="center" align="middle">
        <Col>
          <Card
            title="Settings"
            bordered={true}
            style={{ width: 400, borderRadius: 20 }}
          >
            <Row justify="center">
              <Col>
                <InputNumber
                  disabled={!(isPause || !isStarted)}
                  controls={false}
                  addonBefore="1 second to"
                  addonAfter="seconds"
                  defaultValue={1}
                  min={1}
                  onChange={(value) => {
                    if (value) {
                      setStep(value);
                    }
                  }}
                />
              </Col>
            </Row>
            <Row justify="start">
              <Col>
                <span style={{ fontSize: "16px" }}>Start time </span>
                <DatePicker
                  disabled={isStarted}
                  defaultValue={dayjs()}
                  style={{ marginTop: 10 }}
                  format="DD-MM-YYYY"
                  onChange={(date) => {
                    if (date) {
                      const newDate =
                        date
                          .set("hour", 12)
                          .set("minute", 0)
                          .set("second", 0)
                          .toDate()
                          .getTime() / 1000;
                      setGameTimeSecondsStart(newDate);
                    }
                  }}
                />
              </Col>
            </Row>
            <Row justify="center" gutter={24}>
              <Col>
                <Button
                  disabled={!!timer}
                  style={{ marginTop: 10 }}
                  type="primary"
                  onClick={() => startSimulator()}
                >
                  Start
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={!(isStarted || isPause)}
                  style={{ marginTop: 10 }}
                  type="primary"
                  onClick={() => stopSimulator()}
                >
                  Stop
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={!(isStarted || isPause)}
                  style={{ marginTop: 10 }}
                  type="primary"
                  onClick={() =>
                    isPause ? resumeSimulator() : pauseSimulator()
                  }
                >
                  {isPause ? "Resume" : "Pause"}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col>
          <Card
            title="Result"
            bordered={true}
            style={{ width: 400, borderRadius: 20 }}
          >
            <Row gutter={24} justify="center">
              <Col>
                <Statistic
                  title="Real Time Left"
                  value={realTimeSeconds}
                  formatter={(value) => {
                    return <p>{getRealTimeLeftString(Number(value))}</p>;
                  }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Game Time"
                  value={gameTimeSeconds}
                  formatter={(value) => {
                    return <p>{getGameTimeString(Number(value))}</p>;
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
