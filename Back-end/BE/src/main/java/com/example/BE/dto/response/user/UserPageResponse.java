package com.example.BE.dto.response.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@ToString
@Accessors(chain = true)
public class UserPageResponse {
    private int page;
    private int pageSize;
    private int totalPage;
    private int totalElement;
    private List<UserResponse> userResponseList;
}
