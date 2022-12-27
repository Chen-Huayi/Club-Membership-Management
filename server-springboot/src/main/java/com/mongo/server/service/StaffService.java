package com.mongo.server.service;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class StaffService {
    private static final String COLLECTION_NAME = "staffs";

    @Resource
    private MongoTemplate mongoTemplate;


}
