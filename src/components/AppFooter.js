import { Footer } from "react-daisyui";
import githubLogo from '../github-mark-white.png';

function AppFooter() {

    return (
        <Footer id="appFooter" className="p-4 bg-primary text-secondary-content flex place-content-center">

          <div className="flex justify-center">
          All data provided by <a href="https://rawg.io/" rel="noreferrer" target="_blank">RAWG.io</a>
          </div>

          <div className="flex justify-center">
            <img className="footer--logo" src={githubLogo} height="15px" alt="github icon" /> 
            <a href="https://github.com/mchlol/jsd-game-list" target="_blank">made by mchlol</a>
          </div>
          
      </Footer>
    )
}

export default AppFooter;