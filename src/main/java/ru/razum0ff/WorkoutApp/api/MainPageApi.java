package ru.razum0ff.WorkoutApp.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/user")
public class MainPageApi {
    @GetMapping("/mainPage")
    public ModelAndView getMainPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("main-page");
        return modelAndView;
    }

}
