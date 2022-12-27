package com.mongo.server.controllers;

import com.mongo.server.models.Member;
import com.mongo.server.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api", consumes = {"application/json"})
@CrossOrigin("*")
public class UserController {
    private final MemberService memberService;

    @Autowired
    public UserController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/member/signup")

    public Object memberSignup(@RequestBody Member member) {
        return memberService.signup(member);
    }
}
