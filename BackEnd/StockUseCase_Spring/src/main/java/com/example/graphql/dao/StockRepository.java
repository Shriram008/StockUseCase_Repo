package com.example.graphql.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.graphql.entity.StockBean;


public interface StockRepository extends JpaRepository <StockBean, Integer> {

	StockBean findByIdEquals (int stockNumber);
	@Modifying
	  @Query("SELECT t FROM StockBean t where t.stockName = :name") 
	public  StockBean findByNameEquals(@Param("name") String stockName);
	 
	
	
   
	
}
