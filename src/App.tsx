import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Titlebar from "./components/Titlebar";
import jsonrepair from "jsonrepair";
import copy from "copy-to-clipboard";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [rawJSON, setRawJSON] = useState("");
  const [formattedJSON, setFormattedJSON] = useState("");
  const [error, setError] = useState("");
  const [isJSONRepair, setIsJSONRepair] = useState(true);
  const [tab, setTab] = useState<string | number>(4);

  const beautifyJson = (jsonStr: string) => {

    if (!jsonStr) {
      setFormattedJSON("");
      setError("");
      return;
    }

    let json = parseJson(jsonStr.replaceAll("/\n", "\\n"));

    if (json) {
      setFormattedJSON(JSON.stringify(json, null, getTab(tab)));
    }
  };

  const getTab = (value: string | number) => {
    let num = Number(value);

    if (!Number.isNaN(num)) {
      return num;
    }

    return "\t";
  };

  const parseJson = (json: string) => {
    try {
      setError("");

      if (isJSONRepair) {
        json = jsonrepair(json);
      }

      return JSON.parse(json);
    } catch (e) {
      setError("Invalid JSON");
      return null;
    }
  };

  const copyBtnClick = () => {
    copy(formattedJSON);
    toast.info("Copied to clipboard", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    beautifyJson(rawJSON);
  }, [tab, rawJSON, isJSONRepair]);

  return (
    <div className="App">
      <ToastContainer />
      <Titlebar error={error}/>
      <main id="container">
        <section id="config">
          <div>
            <select
              name="tabs"
              id="tabs"
              value={tab}
              onChange={e => setTab(e.target.value)}
            >
              <option value="4">4 Space Tab</option>
              <option value="3">3 Space Tab</option>
              <option value="2">2 Space Tab</option>
              <option value="t">1 Tab</option>
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              id="jsonRepair"
              name="jsonRepair"
              checked={isJSONRepair}
              onChange={e => setIsJSONRepair(e.target.checked)}
            />
            <label htmlFor="jsonRepair"> Repair JSON</label>
          </div>
        </section>
        <section id="mainForm">
          <div>
            <textarea value={rawJSON} onChange={e => setRawJSON(e.target.value)} placeholder="JSON Data"/>
          </div>
          <div>
            {formattedJSON ? (
              <button id="copyBtn" onClick={copyBtnClick}>
                📋
              </button>
            ) : (
              <></>
            )}
            <pre>{formattedJSON}</pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
