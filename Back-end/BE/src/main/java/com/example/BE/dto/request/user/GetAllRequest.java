package com.example.BE.dto.request.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
@Setter
@ToString
public class GetAllRequest {
    private String keyword = "";
    private int page = 0;
    private int size = 10;
    private String order = "create_date";
    private String dir = "asc";


    public Pageable getPageable() {
        Sort.Direction direction = dir.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        return PageRequest.of(page, size, Sort.by(direction, order));
    }
}
